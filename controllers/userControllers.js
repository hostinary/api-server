import axios from "axios";
import asyncHandler from "express-async-handler";

export const githubAuth = asyncHandler(async (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
  console.log("Redirecting to github auth url..");
  res.redirect(url);
});

export const authenticateUser = asyncHandler(async (req, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.query.code,
  };
  const opts = { headers: { accept: "application/json" } };
  const response = await axios.post(
    `https://github.com/login/oauth/access_token`,
    body,
    opts
  );

  //TODO: need to handle DB storing user info via Github User info API
  res.status(200).json({ data: response.data });
});
