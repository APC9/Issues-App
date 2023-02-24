import axios from "axios"

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: 'Bearer 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'
  }

})