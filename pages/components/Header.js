export default function Header(){
    return(
            <div className="bg-white h-[40px] w-full mx-auto">
                <div className="max-w-6xl h-full mx-auto flex flex-row justify-between items-center">
                  <h1 className="text-neutral-800 font-black text-2xl mx-5">NFTMUSIC</h1>
                  <button className="bg-slate-800 text-white font-bold text-md p-1 px-2 rounded-lg">connect</button>
                </div>
            </div>
        )
}