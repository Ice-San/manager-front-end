type imgUrlType = {
    imgUrl: string,
    imgSize: string
}

export const IconsContainer = ({ imgUrl, imgSize }: imgUrlType) => {
    return (
        <div className={imgSize}>
            <div className={`divs-container ${imgUrl}`}></div>
        </div>
    );
}