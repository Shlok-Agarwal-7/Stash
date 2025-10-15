# Stash - Secure file Storage

This Repo contains the code for Stash which will soon be hosted on Stay Tuned!!

## Features

- Sleek Dark Mode Responsive UI
- Manage your files and share them with others
- OTP based authentication system for secure access
- Sort Files based on Time created etc
- Drag and Drop Functionality to upload Files
- Search for files in your Stash

## Run Locally

Clone the project

```bash
  git clone https://github.com/Shlok-Agarwal-7/Stash.git
```

Go to the project directory

```bash
  cd Stash
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file you can use the `.example.env` file for reference

- ProjectID of the project created on AppWrite `NEXT_PUBLIC_APPWRITE_PROJECT_ID`

- Name of the project created on AppWrite `NEXT_PUBLIC_APPWRITE_PROJECT_NAME `

- EnpointURL of the project created on AppWrite `NEXT_PUBLIC_APPWRITE_ENDPOINT`

- DataBaseID of the Database used to store data `NEXT_PUBLIC_APPWRITE_DATABASE_ID`

- CollectionID of the users table created on AppWrite `NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID`

- CollectionID of the files table created on AppWrite `NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID`

- BucketID of the Bucket used to store file created on AppWrite `NEXT_PUBLIC_APPWRITE_BUCKET_ID`

- Your Secret Key `NEXT_APPWRITE_SECRET_KEY`
