import { Component, Fragment } from "react";
import dynamic from "next/dynamic";

import containers from "../styles/Containers.module.css";

import wrapper from "../store";
import { randomChoice } from "../tools";
import { PostsLine } from "../infinityBlocks";

const Error = dynamic(() => import("./_error"));
const Seo = dynamic(() => import("../components/Seo/Archive"));
const JournalHeader = dynamic(() => import("../components/Journal/Header"));
const InfinityPosts = dynamic(() => import("../compilations/InfinityPosts"));

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, res, ...props }) => {
    const { getRubrics } = require("../api/methods/public");
    const rubrics = await getRubrics()
      .then((response) => response.data.rubrics)
      .catch((reason) => {
        console.log("Something wrong with getting rubrics -> ", reason);
        return 502;
      });

    let props_data = { rubrics };

    if (typeof rubrics === "number") {
      res.statusCode = rubrics;
      props_data.errorCode = rubrics;
    } else {
      props_data.initial = [];

      for (let i = 0; i < 2; i++) {
        const blockIdentifier = Object.keys(InfinityComponents)[0];
        const blockData = await InfinityComponents[blockIdentifier].fetchMore({
          ...store.getState().common,
          dispatch: store.dispatch,
        });

        props_data.initial.push({
          id: blockIdentifier,
          data: blockData,
        });
      }
    }

    return {
      revalidate: 36000,
      props: props_data,
    };
  }
);

const InfinityComponents = {
  ...PostsLine("posts-line", 3, 4),
  ...PostsLine("post-ad", 1, 1, "leftAd"),
  ...PostsLine("six-posts-ad", 1, 6, () => randomChoice(["leftAd", "rightAd"])),
};

export default function Archive({ rubrics, initial, errorCode }) {
  if (errorCode) return <Error statusCode={errorCode} />;

  return (
    <>
      <Seo />
      <JournalHeader rubrics={rubrics}>Статьи</JournalHeader>
      <div className={containers.CommonContainer}>
        {initial.map(({ id, data }, index) => {
          if (InfinityComponents[id] === undefined) return null;
          const { Component } = InfinityComponents[id];
          return (
            <Fragment key={index}>
              <Component {...data} />
            </Fragment>
          );
        })}
        <InfinityPosts blocks={InfinityComponents} />
      </div>
    </>
  );
}
