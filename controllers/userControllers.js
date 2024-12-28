import axios from "axios";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const githubAuth = asyncHandler(async (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo`;
  console.log("Redirecting to github auth url..");
  res.redirect(url);
});

export const authenticateUser = asyncHandler(async (req, res) => {
  try {
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

    if (response.data.error) {
      res.status(400).json({ error: response.data.error_description });
      return;
    }

    // console.log("LOG1: ", response.data);
    const accessToken = response.data.access_token;
    const githubUserInfo = await getGithubUserInfo(accessToken);

    const user = await User.findOne({ username: githubUserInfo.username });

    // console.log("LOG2: ", user);
    if (user) {
      res.status(200).json(user);
    } else {
      const newUser = await User.create(githubUserInfo);
      //   console.log("LOG4: ", newUser);
      res.status(201).json({ user: newUser });
    }
  } catch (error) {
    // console.log("LOG5: ", error);
    res.status(500).json({
      error: "An error occurred during authentication",
    });
  }
});

export const getGithubUserInfo = async (accessToken) => {
  let userInfo;
  try {
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    userInfo = {
      username: data.login,
      name: data.name || "",
      email: data.email || "",
      avatar_url: data.avatar_url,
      access_token: accessToken,
      profile_url: data.html_url,
    };
  } catch (error) {
    // console.log("LOG6: ", error);
    throw new Error(error);
  }

  return userInfo;
};
