import { Button, createStyles, Pagination } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link'
import React from 'react'
import { toLink } from '../lib/util'

const useStyles = createStyles((theme) => {

    return {
        defaultButton: {
            borderColor: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[8],
            color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[8],
        },
        activeButton: {
            color: theme.white,
        }
    };
});

interface Props {
    currentPage: number
    pageCount: number
    rootPath: string
}

const MyPagination = ({ currentPage, pageCount, rootPath }: Props) => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation('common');

    const getDefaultButton = (text: string, title: string, isDisabled?: boolean) => {
        return (
            <Button variant='outline' className={classes.defaultButton} disabled={isDisabled} title={title}>
                {text}
            </Button>
        )
    }

    return (
        <Pagination
            page={currentPage}
            total={pageCount}
            position='center'
            mt={'lg'}
            itemComponent={(props, context) => {

                const page = props.page;

                // Check if page is a number or 'next' / 'previous' etc.
                if (isNaN(Number(page))) {

                    if (page === 'prev') {
                        // If page is previous

                        if (currentPage === 1) {
                            // First page has previus button disabled
                            return <>{getDefaultButton('<', t('pagination.previous'), true)}</>

                        } else {
                            // Other pages have previous button enabled
                            return <Link
                                href={{
                                    pathname: '/' + rootPath,
                                    query: { page: currentPage - 1 },
                                }}
                                passHref
                            >
                                {getDefaultButton('<', t('pagination.previous'))}
                            </Link>
                        }

                    }

                    if (page === 'next') {
                        // If page is next

                        if (currentPage === pageCount) {
                            // Last page has the next button disabled
                            return <>{getDefaultButton('>', t('pagination.next'), true)}</>

                        } else {
                            // Other pages have a next button
                            return <Link
                                href={{
                                    pathname: '/' + rootPath,
                                    query: { page: currentPage + 1 },
                                }}
                                passHref
                            >
                                {getDefaultButton('>', t('pagination.next'))}
                            </Link>
                        }
                    }

                    // Will only happen if we enable edges in pagination ('first','last')
                    return <Link href={toLink(rootPath)}>{page}</Link>

                } else {
                    // If page is a number

                    if (currentPage === page) {
                        // If page number equals the currently displayed page
                        return (
                            <Link
                                href={{
                                    pathname: '/' + rootPath,
                                    query: page === 1 ? undefined : { page: page },
                                }}
                                passHref
                            >
                                <Button variant='filled' className={classes.activeButton} title={t('pagination.currentPage', { page: page })}>
                                    {page}
                                </Button>
                            </Link>
                        )
                    } else {
                        // If page is not the current page
                        return (
                            <Link
                                href={{
                                    pathname: '/' + rootPath,
                                    query: { page: page },
                                }}
                                passHref
                            >
                                {getDefaultButton(page.toString(), t('pagination.otherPage', { page: page }))}
                            </Link>
                        )
                    }
                }
            }}
        />
    )
}

export default MyPagination