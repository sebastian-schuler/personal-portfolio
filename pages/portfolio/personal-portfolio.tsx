import { GetServerSideProps, NextPage } from 'next'
import { getPortfolioItem } from '../../lib/api/portfolioApi'
import { PortfolioItem } from '../../types/portfolio'
import PortfolioContainer from '../../ui/portfolio/portfolio-container'

interface Props {
    data: PortfolioItem
}

const PersonalPortfolioPage: NextPage<Props> = ({ data }: Props) => {


    return (
        <PortfolioContainer
            title={data.title}
            date={data.date}
            githubUrl={data.githubUrl}
            appUrl={data.appUrl}
        >
            PersonalPortfolioPage
        </PortfolioContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const resolvedUrl = context.resolvedUrl;
    const lastSlash = resolvedUrl.lastIndexOf('/') + 1;

    const data = await getPortfolioItem(context.locale || 'en', resolvedUrl.substring(lastSlash));

    return {
        props: {
            data
        },
    }
}
export default PersonalPortfolioPage;