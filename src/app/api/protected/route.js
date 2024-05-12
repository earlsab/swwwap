// import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

// export const POST = withApiAuthRequired(async function addItem(req) {
//   const res = new NextResponse();
//   const { user } = await getSession(req, res);
//   return NextResponse.json({ protected: "My Secret", id: user.sub }, res);
// });

// export const GET = withApiAuthRequired(async function getItems(req) {
//     const res = new NextResponse();
//     const { user } = await getSession(req, res);
//     return NextResponse.json({ protected: "My Secret", id: user.sub }, res);
//   });
