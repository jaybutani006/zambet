const getPercentageOff = (display_price, selling_price) => {
    return (
        (
            (
                (Number(display_price) || 0)
                -
                (Number(selling_price) || 0)
            ) /
            (
                (Number(display_price) || 0)
            )
        ) * (
            Number(100)
        )
    )
}

export {
    getPercentageOff
}