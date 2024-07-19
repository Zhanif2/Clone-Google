const SearchedImageItemTemplate = ({data}) => {
    return <div className="group flex flex-col py-3 cursor-pointer" onClick={() => window.open(data.image.contextLink)}>
        <div className="rounded-xl overflow-hidden bg-black/[0.03] h-[100px] md:h-[120px] lg:-h[140px] group-hover:shadow-c">
        <img src={data.link} className="h-full w-full object-contain" />
        </div>
    </div>
};

export default SearchedImageItemTemplate;
