export default function PricesPage(){
  const data = [
    {cat:'Cortes', items:[['Corte mujer', '35€'], ['Corte hombre', '25€'], ['Corte niño', '18€']]},
    {cat:'Coloración', items:[['Color raíz', '40€'], ['Mechas', '65€'], ['Balayage', '90€']]},
    {cat:'Peinados', items:[['Brushing', '20€'], ['Recogido', '45€']]},
    {cat:'Barbería', items:[['Afeitado clásico', '18€'], ['Arreglo de barba', '15€']]},
    {cat:'Tratamientos', items:[['Hidratación', '25€'], ['Keratina', '120€']]},
  ]
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">Precios</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {data.map((section,idx)=> (
          <div key={idx} className="bg-white border border-black/10 rounded-xl p-6">
            <h2 className="font-medium mb-4">{section.cat}</h2>
            <div className="divide-y">
              {section.items.map(([name, price], i)=> (
                <div key={i} className="flex items-center justify-between py-3">
                  <span className="text-neutral-700">{name}</span>
                  <span className="text-black font-medium">{price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
