type imgUrlType = {
    url: string,
    className: string
}

export const Icon = ({ url, className }: imgUrlType) => {
    return (
        <div className={className}>
            <div 
                className='divs-container'
                style={{ backgroundImage: `url("${url}")` }}
            ></div>
        </div>
    );
}