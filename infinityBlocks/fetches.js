import dayjs from "dayjs";

import { shuffleChoice } from "../tools";
import { fetchCatPosts, loadEvents, loadPosts } from "../api/methods/public";
import {
  setAvailableCategories,
  setCategoryOffset,
  setDateOffset,
  setPostsOffset,
  setPrevCategories,
} from "../actions/common";

export async function fetchCategoryLine({
  availableCategories: categories,
  existsPostIds,
  prevCategoryIds,
  categoryOffsets,
  dispatch,
}) {
  let catLine = { posts: [] };
  while (catLine.posts.length === 0 && categories.length > 0) {
    const category = shuffleChoice(
      categories,
      prevCategoryIds,
      categories.length
    );
    if (
      categoryOffsets[category.id] !== undefined &&
      category.postCount <= categoryOffsets[category.id]
    ) {
      categories = categories.filter((cat) => cat.id !== category.id);
      continue;
    }

    let start =
      categoryOffsets[category.id] !== undefined
        ? categoryOffsets[category.id]
        : 0;
    await fetchCatPosts(4, category.id, existsPostIds, start)
      .then((response) => {
        if (response.data.posts != null && response.data.posts.length > 0) {
          catLine = {
            category,
            posts: response.data.posts,
          };
          dispatch(
            setCategoryOffset(category.id, start + response.data.posts.length)
          );
          dispatch(setPrevCategories([category.id]));
        } else {
          categories = categories.filter((cat) => cat.id !== category.id);
        }
      })
      .catch((reason) =>
        console.log(
          "Something wrong with getting category posts in infinity -> ",
          reason
        )
      );
  }

  dispatch(setAvailableCategories(categories));
  if (catLine.posts.length === 0) {
    return { error: true };
  }
  return catLine;
}

export async function fetchKudaGo({}) {
  const posts = await loadEvents(
    null,
    null,
    null,
    dayjs().day(1).toISOString(),
    dayjs().day(7).toISOString(),
    0,
    20
  )
    .then((response) => response.data.posts)
    .catch((reason) => {
      console.log("Something went wrong with fetch KUDA GO events -> ", reason);
      return [];
    });

  if (posts == null || posts.length === 0) {
    return { error: true };
  }
  return { posts };
}

export async function fetchPostLine({
  count = 4,
  categoryOffsets,
  postsOffset,
  dispatch,
  category,
  rubric,
}) {
  let postsLine = {
    posts: [],
  };

  if (category !== undefined) {
    let start =
      categoryOffsets[category] !== undefined ? categoryOffsets[category] : 0;
    await fetchCatPosts(count, category, [], start)
      .then((response) => {
        if (response.data.posts != null && response.data.posts.length > 0) {
          postsLine = {
            posts: response.data.posts,
          };
          dispatch(
            setCategoryOffset(category, start + response.data.posts.length)
          );
        }
      })
      .catch((reason) =>
        console.log(
          "Something wrong with getting posts in infinity -> ",
          reason
        )
      );
  } else {
    await loadPosts(rubric, null, postsOffset, count)
      .then((response) => {
        if (response.data.posts != null && response.data.posts.length > 0) {
          postsLine = {
            posts: response.data.posts,
          };
          dispatch(setPostsOffset(postsOffset + response.data.posts.length));
        }
      })
      .catch((reason) =>
        console.log(
          "Something wrong with getting posts in infinity -> ",
          reason
        )
      );
  }

  if (postsLine.posts.length === 0) {
    return { error: true };
  }

  return postsLine;
}

export async function fetchNewsDate({
  postsOffset,
  rubric,
  dispatch,
  latestDate,
}) {
  let postsLine = {
    posts: [],
  };

  await loadPosts(rubric, null, postsOffset, 100, [])
    .then((response) => {
      if (response.data.posts != null && response.data.posts.length > 0) {
        postsLine.posts = response.data.posts;
        dispatch(setPostsOffset(postsOffset + response.data.posts.length));
      }
    })
    .catch((reason) =>
      console.log("Something wrong with getting posts in infinity -> ", reason)
    );

  if (postsLine.posts.length === 0) {
    return { error: true };
  }

  return postsLine;
}
