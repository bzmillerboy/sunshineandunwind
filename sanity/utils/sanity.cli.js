// https://www.sanity.io/docs/cli-reference

// sanity.cli.js
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'agnoplrn',
    dataset: 'production',
  },
})
