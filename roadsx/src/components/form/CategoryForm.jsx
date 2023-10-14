

const CategoryForm = ({ handleSubmit, value, setValue ,btnLabel}) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2">
       
          <input
            type="text"
            className="w-full bg-white text-center h-10 border-2 font-serif text-lg rounded-full shadow-inner"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
      

      <button className='w-36 bg-gradient-to-r from-teal-300 to-teal-500 text-gray-600 rounded-full font-serif  shadow-inner shadow-white hover:text-black  'type='submit'>{btnLabel}</button>
      </form>
    </>
  );
};

export default CategoryForm;