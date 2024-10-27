export default function UserForm({ buttonName }){
    return(<>
        <button className="px-2 py-1 text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm"
                type="submit">{buttonName}
        </button>
    </>);
}