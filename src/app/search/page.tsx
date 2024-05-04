import { Container } from '@mui/material';
import type { Metadata } from 'next';
import ClientSearch from './components/client.search';

export const metadata: Metadata = {
    title: 'Search Page',
    description: 'Just a description',
}


const SearchPage = () => {
    return (
        <Container sx={{ mt: 3 }}>
            <ClientSearch />
        </Container>
    )
}

export default SearchPage