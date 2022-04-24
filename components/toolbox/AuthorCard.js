import Image from 'next/image'

export default function AuthorCard({ author = {}, avatar='' }) {
    let attributes = {};
    if (author.data && author.data.attributes) {
        //displayName firstName lastName avatar
        attributes = author.data.attributes
    }

    var username = attributes.username
    if(!username){
        username = (attributes.firstName ?attributes.firstName:'')+(attributes.lastName ?(' '+attributes.lastName):'')
    }
    return (
        <>
            <div className="mb-6 md:mb-0 bg-white border-gray-300 p-5 block md:block rounded-lg">
                <a>
                    <h1 tabIndex={0} className="text-sm font-semibold mb-3">{attributes.title ? attributes.title : "Posted by"}</h1>
                    <div className="py-2 w-full relative flex">
                        <div className="relative mr-3">
                            <div className="w-12 h-12 rounded-full border border-1 overflow-hidden relative border-gray-100 shadow-sm">
                                {
                                    (attributes.avatar || attributes.legacyAvatar) && <Image 
                                    tabIndex={0}
                                    layout="fill"
                                    objectFit="cover"
                                    src={ attributes?.avatar?.data? attributes.avatar.data.attributes.url:
                                        attributes?.legacyAvatar ? attributes.legacyAvatar
                                          :"https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"}
                                    className="rounded-full " 
                                    alt="Author profile picture"/>
                                }
                            </div>
                        </div>

                        <div className="my-auto">
                            <p tabIndex={0} className="text-sm cursor-pointer leading-5 font-semibold text-gray-800">
                                {username}
                            </p>
                            <p tabIndex={0} className="text-sm">Editor</p>
                            {/* <div className="flex">
                                <p className="text-sm leading-5 text-gray-700">
                                Social Media and Partnerships Management at Prototypr.io
                                </p>
                            </div> */}
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}