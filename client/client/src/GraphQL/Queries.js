import {gql} from '@apollo/client';

export const LOAD_GAMES = gql`   
    query GetGames {
        games {
            id
            platform
            title
        }
    }
`;