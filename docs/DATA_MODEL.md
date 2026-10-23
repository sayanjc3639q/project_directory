# Bilbili Data Model

## 1. Collection `topics`
Document ID: 6-character private ID (e.g., `A9xK2m`).
- `id`: string (6 chars, [0-9A-Za-z])
- `name`: string
- `slug`: string
- `parentId`: string | null
- `level`: number (0 for root, 1, 2...)
- `ancestors`: string[] (chain of ancestor IDs)
- `slugPath`: string[] (chain of slugs)
- `pathKey`: string (unique, e.g. "tech/frontend/react")
- `nameChain`: string[]
- `childCount`: number
- `blogCount`: number
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string

## 2. Collection `blogs`
Document ID: Auto-generated Firestore ID.
- `title`: string
- `slug`: string (globally unique)
- `subtopicId`: string (6 chars)
- `topicPath`: string[] (ID chain)
- `topicPathKey`: string
- `topicNameChain`: string[]
- `blocks`: Block[]
- `references`: Reference[]
- `acknowledgement`: string | null
- `status`: "draft" | "published"
- `excerpt`: string
- `readingTime`: number
- `tags`: string[]
- `keywords`: string[]
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string
- `publishedAt`: ISO 8601 string | null
