import axios from "axios"

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: 'Bearer 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'
  }

})