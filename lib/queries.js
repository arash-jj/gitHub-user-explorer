import { gql } from '@apollo/client';

export const GET_USER = gql`
    query GetUser($username: String!) {
        user(login: $username) {
        name
        bio
        avatarUrl
        followers {
            totalCount
        }
        repositories(
            first: 10
            orderBy: { field: STARGAZERS, direction: DESC }
        ) {
            nodes {
            name
            description
            stargazerCount
            forkCount
            updatedAt
            }
        }
        }
    }
`;