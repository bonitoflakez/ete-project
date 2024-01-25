const BlogPost = ({ id, title, imageURL, content, date }) => {
    return (
        <div className="bg-gray-200 rounded-md">
            <div className="rounded-t-md" style={{ height: "40vh", overflow: "hidden" }}>
                <img src={imageURL} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <h4 className="ml-auto text-lg font-medium">{date}</h4>
                </div>
                <div className="mt-2">
                    <p className="text-sm">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogPost;