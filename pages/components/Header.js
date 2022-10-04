export default function Header(){
    return(
            <div className="bg-slate-900 h-[40px] w-full mx-auto shadow-xl">
                <div className="max-w-6xl h-full mx-auto flex flex-row justify-between items-center">
                  <h1 className="text-neutral-50 font-light text-2xl mx-5 tracking-widest">NFTMUSIC</h1>
                  <button className="bg-slate-50 text-slate-800 font-bold text-md p-1 px-2 rounded-lg">connect</button>
                </div>
            </div>
        )
}