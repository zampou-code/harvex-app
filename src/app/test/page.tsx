"use client";

import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

import React from "react";
import { collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Page() {
  const [value, loading, error] = useCollectionData(collection(db, "packs"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (!error && value) {
    console.log(value);
    // const tableData = value?.docs.map((doc) => doc.data());
    // console.log(tableData[0].details);
  }

  return (
    <div className="w-full h-[100vh] grid place-items-center">
      <div>
        <p>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {/* {value && (
            <span>
              Collection:{" "}
              {value.docs.map((doc) => (
                <React.Fragment key={doc.id}>
                  {JSON.stringify(doc.data())},{" "}
                </React.Fragment>
              ))}
            </span>
          )} */}
        </p>
      </div>
    </div>
  );
}
