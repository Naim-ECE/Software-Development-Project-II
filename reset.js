<button
  onClick={() => {
    localStorage.clear();
    window.location.reload();
  }}
  className="bg-red-500 text-white p-2 rounded"
>
  Reset App
</button>;
