import { jsx as _jsx } from "react/jsx-runtime";
export const IconsContainer = ({ imgUrl, imgSize }) => {
    return (_jsx("div", { className: imgSize, children: _jsx("div", { className: `divs-container ${imgUrl}` }) }));
};
