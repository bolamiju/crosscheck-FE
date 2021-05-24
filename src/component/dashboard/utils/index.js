// import React from "react";
import axios from "axios";
import store from "../../../store";
import {
  fetchInstitutes,
  setPageInfo,
  noInstitute,
} from "../../../state/actions/institutions";

const resources = {};

const makeRequestCreator = () => {
  let cancel;

  return async (query) => {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();
    try {
      if (resources[query]) {
        // Return result if it exists
        return resources[query];
      }
      const res = await axios(query, { cancelToken: cancel.token });
      const {
        docs,
        totalDocs,
        totalPages,
        hasPrevPage,
        hasNextPage,
        page,
      } = res.data.institution;
      if (docs.length === 0) {
        store.dispatch(noInstitute(true));
      }
      store.dispatch(fetchInstitutes(docs));
      store.dispatch(
        setPageInfo({ totalDocs, totalPages, hasPrevPage, hasNextPage, page })
      );
      // Store response
      // resources[query] = docs;

      return docs;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        return error.message
      } else {
        // Handle usual errors
        return error.message;
      }
    }
  };
};

export const search = makeRequestCreator();
