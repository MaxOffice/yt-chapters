# yt-chapters

## Overview
This tool was created as a proof-of-concept for adding "Chapter" information to descriptions of YouTube videos, for [Dr. Nitin Paranjape](https://www.linkedin.com/in/nitinparanjape/). For details, see his [blog post](https://efficiency365.com/2020/06/05/youtube-chapter-creation-tool).

Briefly, YouTube can parse chapter headings and timestamps in the description of a video, and overlay these headings on the video's timeline. The headings have to be in chronological order, with the first heading bearing a zero timestamp, 0:00 or 0:0:00.

This tool allows the creation of such chapter headings in the correct format, and can update the description of a YouTube video. 

![Screenshot](https://i1.wp.com/efficiency365.com/wp-content/uploads/2020/06/image.jpeg?resize=768%2C427&ssl=1)

When a user pastes the ID of a YouTube video in the provided text box, the tool fetches the description, and parses it for chapter heading in the form "_heading_ - _time". Currently, the tool recognizes only that format.

If it finds any such headings, it populates a table where the user can edit the headings or add new ones as needed. If no such headings are found, the user can enter their own. In either case, an initial heading with 00:00 as the time is provided.

The tool ensures that the headings are in the correct order as the user enters them.

Once done, the user can choose to add the headings to the description. Note that the headings (in the correct format) will be _appended_ to the description - existing headings will remain as they are.

The user may then edit the description as needed, and finally click the update button to update it in YouTube.

## Security
This tool uses the YouTube Data 2.0 Google API, which requires OAuth 2.0 permissions. Specifically, the tool requires an OAuth Scope called `https://www.googleapis.com/auth/youtube`.

## Running the tool
1. Decide where you want to run it. For instance, you could run it locally using a development web server, or you could run it on a public or private web server. To run it on a non-local web server, copy the `css` and `js` directories and the `index.html` file to the relevant place.
2. Get a Google API Key and Client ID. To do so, go to the [Google API Console](https://console.developers.google.com/). Create a new project. In the Credentials section, create an API Key, and an OAuth Client ID. For the latter, provide the URL of the server where you will be running the tool.
3. Copy the API Key, and the Client ID. Open the file `main.js` in the 'js' subdirectory of your server. Paste the API Key and Client ID where indicated near the top of the file.
4. Run the web server. Browse to the home page, and click **Sign in/Authorze**. The first time, you will go through an authorization process which will allow your Google API project to call the YouTube APIs with your credentials.
