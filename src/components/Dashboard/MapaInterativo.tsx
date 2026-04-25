export const MapaInterativo = ({ url }: { url: string }) => (
  <div className="bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
    <h3 className="text-sm font-bold text-gray-400 uppercase p-4">
      Mapa de Calor (Focos)
    </h3>
    <iframe
      src={url}
      className="w-full h-[500px] border-none rounded-[2rem]"
      title="Mapa de Focos"
    />
  </div>
);
