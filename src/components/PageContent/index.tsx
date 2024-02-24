import { Container } from '@mui/material';

export interface PageContentProps {
    children: React.ReactNode,
    my?: number,
    centerX?: boolean,
    centerY?: boolean,
};

/**
 * Layout for most standard pages, has an appbar, content and footer.
 * Content is never clipped because of min-height: 100vh making it always scrollable on overflow and visible.
 * Content is also in MUI Container so it takes less width on bigger screens (has a max-width property of about 1200px)
 */
export default function PageContent({ children, my, centerX, centerY }: PageContentProps) {

    return (
        <Container sx={{
            minHeight: 'calc(100vh - 64px)',
            paddingTop: my,
            paddingBottom: my,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: centerY ? 'center' : undefined,
            alignItems: centerX ? 'center' : undefined,
        }}>
            {children}
        </Container>
    );
};
