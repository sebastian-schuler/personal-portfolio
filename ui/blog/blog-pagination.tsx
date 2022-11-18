import { Button, createStyles, Pagination } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { toLink } from '../../lib/util'

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
}

const BlogPagination = ({ currentPage, pageCount }: Props) => {

    const { classes, theme } = useStyles();

    const getDefaultButton = (text: string, isDisabled?: boolean) => {
        return (
            <Button variant='outline' className={classes.defaultButton} disabled={isDisabled}>
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

                // Check if page is a number or not
                if (isNaN(Number(page))) {

                    if (page === 'prev') {

                        if (currentPage === 1) {
                            return <>
                                {
                                    getDefaultButton('<', true)
                                }
                            </>
                        } else {
                            return <Link
                                href={{
                                    pathname: '/blog',
                                    query: { page: currentPage - 1 },
                                }}
                                passHref
                            >
                                {
                                    getDefaultButton('<')
                                }
                            </Link>
                        }

                    }

                    if (page === 'next') {

                        if (currentPage === pageCount) {
                            return <>
                                {
                                    getDefaultButton('>', true)
                                }
                            </>
                        } else {
                            return <Link
                                href={{
                                    pathname: '/blog',
                                    query: { page: currentPage + 1 },
                                }}
                                passHref
                            >
                                {
                                    getDefaultButton('>')
                                }
                            </Link>
                        }
                    }

                    return <Link href={toLink('blog')}>{page}</Link>

                } else {

                    if (currentPage === page) {
                        return (
                            <Link
                                href={{
                                    pathname: '/blog',
                                    query: page === 1 ? undefined : { page: page },
                                }}
                                passHref
                            >
                                <Button variant='filled' className={classes.activeButton}>
                                    {page}
                                </Button>
                            </Link>
                        )
                    } else {
                        return (
                            <Link
                                href={{
                                    pathname: '/blog',
                                    query: { page: page },
                                }}
                                passHref
                            >
                                {
                                    getDefaultButton(page.toString())
                                }
                            </Link>
                        )
                    }
                }
            }}
        />
    )
}

export default BlogPagination