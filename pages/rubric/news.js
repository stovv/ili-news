import { Component } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
// css
import containers from "../../styles/Containers.module.css";

// local functions
import wrapper from "../../store";
import { DateNews } from "../../infinityBlocks";
import AdBanner from "../../compilations/Ad";

// local blocks
const Error = dynamic(() => import("../_error"));
const Seo = dynamic(() => import("../../components/Seo/Rubric"));
const JournalHeader = dynamic(() => import("../../components/Journal/Header"));
const InfinityPosts = dynamic(() => import("../../compilations/InfinityPosts"));
const SideContainer = dynamic(() => import("../../components/Containers/Side"));

const InfinityComponents = {
  ...DateNews("news-date", 2),
};
const Initial = Object.values({
  ...DateNews("news-date", 1, { isFirst: true }),
})[0];

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, ...props }) => {
    const {
      getRubric,
      getPostCountInRubric,
    } = require("../../api/methods/public");

    const rubric = await getRubric("news")
      .then((response) => (response.data.length > 0 ? response.data[0] : 404))
      .catch((reason) => {
        console.log("Something wrong with getting news -> ", reason);
        return 502;
      });

    let props_data = { rubric };

    if (typeof rubric === "number") {
      props_data.errorCode = rubric;
    } else {
      const postsCount = await getPostCountInRubric(rubric.id)
        .then((response) => response.data)
        .catch((reason) => {
          console.log(
            "Something went wrong in getting posts count by news -> ",
            reason
          );
          return 0;
        });
      props_data.postsCount = postsCount;

      if (postsCount > 0) {
        props_data.initial = await Initial.fetchMore({
          ...store.getState().common,
          rubric: rubric.id,
          dispatch: store.dispatch,
        });
      }

      if (props_data.rubric.category === null) {
        props_data.rubric.category = {
          title: "",
          description: "",
        };
      }
    }

    return {
      revalidate: 36000,
      props: props_data,
    };
  }
);

class NewsRubric extends Component {
  state = {
    rebuild: false,
  };

  render() {
    const {
      router,
      initial = [],
      errorCode,
      postsCount,
      rubric: {
        id,
        slug,
        title,
        subtitle,
        category = { title: "", description: "" },
        emoji,
      } = {},
    } = this.props;
    const { rebuild } = this.state;

    if (router.isFallback) return <></>;
    if (errorCode) return <Error statusCode={errorCode} />;
    if (rebuild) this.setState({ rebuild: false });

    return (
      <>
        <Seo
          slug={slug}
          title={title}
          subtitle={subtitle}
          category={category}
        />
        <section>
          <JournalHeader>{title}</JournalHeader>
          {postsCount === 0 ? (
            <p>Здесь пока ничего нет</p>
          ) : (
            <div className={containers.CommonContainer}>
              <SideContainer
                sideChildren={<AdBanner vertical height={"90vh"} />}
              >
                {!rebuild && postsCount > 0 && initial !== null && (
                  <Initial.Component {...initial} />
                )}
                {!rebuild && postsCount > 0 && (
                  <InfinityPosts
                    blocks={InfinityComponents}
                    additionalProps={{ rubric: id }}
                  />
                )}
              </SideContainer>
            </div>
          )}
        </section>
      </>
    );
  }
}

export default withRouter(NewsRubric);
