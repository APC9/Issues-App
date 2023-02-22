import axios from "axios"

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: 'Bearer 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'
  }

})