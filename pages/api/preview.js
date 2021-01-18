// import { getDraft } from "../../api/methods/public";
//
// export default async function handler(req, res) {
//   if (!req.query.jwt || !req.query.slug) {
//     return res.status(400).json({
//       message: "Bad request, not all field filled",
//       data: {
//         jwt: req.query.jwt,
//         slug: req.query.slug,
//       },
//     });
//   }
//
//   const post = await getDraft(req.query.slug, req.query.jwt)
//     .then((response) => response.data)
//     .catch((reason) => console.log(""));
//
//   // If the slug doesn't exist prevent preview mode from being enabled
//   if (!post) {
//     return res.status(401).json({ message: "Invalid slug" });
//   }
//   res.setPreviewData(
//     {},
//     {
//       maxAge: 60 * 60,
//     }
//   );
//   res.redirect(post.slug);
// }
