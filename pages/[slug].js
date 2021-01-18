import { Component } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { connect } from "react-redux";

import wrapper from "../store";
import { handleAxiosError } from "../tools";
import { changeInfinityState } from "../actions/common";
import { PostContainer } from "../styles/Containers.module.css";

const Error = dynamic(() => import("./_error"));
const AdBanner = dynamic(() => import("../compilations/Ad"));
const Header = dynamic(() => import("../components/Post/Header"));
const Content = dynamic(() => import("../components/Post/Content"));
const SideContainer = dynamic(() => import("../components/Containers/Side"));

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params: { slug }, ...props }) => {
    const { getPost } = require("../api/methods/public");

    const post = await getPost(slug)
      .then((response) => (response.data.length > 0 ? response.data[0] : 404))
      .catch((reason) => {
        return handleAxiosError(reason, {
          server_response: ({ data, status }) => {
            console.log("Something went wrong with getting post -> ", data);
            return 404;
          },
          server_no_response: ({ request }) => {
            console.log("Something wrong on backend -> ", request);
            return 502;
          },
          request_triggered_error: ({ message }) => {
            console.log("Something wrong on client -> ", message);
            return 400;
          },
        });
      });

    let props_data = {};
    if (typeof post === "number") {
      props_data.errorCode = post;
    } else {
      props_data.post = {
        ...post,
        authors: post.authors.map((author) => {
          let additionalData = {};
          if (post.authorsDescription.length > 0) {
            for (let descr of post.authorsDescription) {
              if (descr.author.id === author.id) {
                const { icon, roleDescription } = descr;
                additionalData = {
                  icon,
                  roleDescription,
                };
              }
            }
          }
          return {
            ...author,
            ...additionalData,
          };
        }),
      };
    }

    return {
      revalidate: 36000,
      props: props_data,
    };
  }
);

export async function getStaticPaths() {
  const { fetchPosts } = require("../api/methods/public");

  const slugs = [];
  let start = 0;
  let stop = false;

  while (!stop) {
    await fetchPosts(["slug"], start, 100)
      .then((response) => {
        if (response.data.posts.length === 0) {
          stop = true;
        } else {
          response.data.posts.forEach((post) => {
            slugs.push({
              params: {
                slug: post.slug,
              },
            });
          });
        }
      })
      .catch((reason) => {
        stop = true;
        handleAxiosError(reason, {
          server_response: ({ data, status }) => {
            console.log(
              "Something went wrong with fetching posts slugs -> ",
              data
            );
            return status;
          },
          server_no_response: ({ request }) => {
            console.log(
              "(fetching posts slugs) Something wrong on backend -> ",
              request
            );
            return 502;
          },
          request_triggered_error: ({ message }) => {
            console.log(
              "(fetching posts slugs) Something wrong on client -> ",
              message
            );
            return 400;
          },
        });
      });
    start += 100;
  }

  return { paths: slugs, fallback: true };
}

const PostStructure = ({ data }) => (
  <>
    <Header data={data} />
  </>
);

class Post extends Component {
  componentDidMount() {
    this.props.dispatch(changeInfinityState(false));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isInfinity =
      this.props.post !== undefined &&
      this.props.post.rubric &&
      this.props.post.rubric.slug === "news";
    if (this.props.infinityActive !== isInfinity) {
      this.props.dispatch(changeInfinityState(isInfinity));
    }
  }

  render() {
    const {
      errorCode,
      router,
      post = {},
      popularPosts,
      readMoreLinks,
    } = this.props;

    if (router.isFallback) return <></>;
    if (errorCode) return <Error statusCode={errorCode} />;
    const isInfinity = post.rubric && post.rubric.slug === "news";
    // TODO AMP Checking
    // TODO Use this.props.user for head component

    return (
      <div className={PostContainer}>
        {/*<Seo post={current_post}/>*/}
        <Header data={post} />
        <SideContainer
          sideChildren={<AdBanner vertical height={"90vh"} />}
          style={{ marginTop: "64px" }}>
          {/*  <Content data={post.content} />*/}
        </SideContainer>
      </div>
    );
  }
}

export default connect((state) => ({
  infinityActive: state.common.infinityActive,
}))(withRouter(Post));
