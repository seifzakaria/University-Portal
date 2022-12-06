import React, { useEffect, useState } from "react";
import { Box, Link } from "@material-ui/core";
import Nav from "../../../NavBars/Nav";

export const SlotLinkingRequests = () => {
  const [Requests, setRequests] = useState([]);
  useEffect(() => {
    let requests = ["request1", "request2", "request3", "request4"];
    setRequests(requests);
  }, []);

  const del = (i) => {
    const newArr = [];
    for (let index = 0; index < Requests.length; index++) {
      if (index !== i) {
        const element = Requests[index];
        newArr.push(element);
      }
    }

    setRequests(newArr);
  };
  return (
    <div>
      <Nav />
      <Box m={5}>
        <Box>
          <h1>Slot linking requests(dummy data)</h1>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          mt={5}
        >
          {Requests.map((request, i) => {
            return (
              <Box mt={2} mb={2} justifyContent="center" display="flex" key={i}>
                <Box>
                  <h5>{request}</h5>
                </Box>
                <Box ml={2}>
                  <Link
                    onClick={() => {
                      del(i);
                    }}
                  >
                    Accept
                  </Link>
                </Box>
                <Box ml={2}>
                  <Link
                    onClick={() => {
                      del(i);
                    }}
                  >
                    Reject
                  </Link>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};
