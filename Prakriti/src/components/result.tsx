import Image from "next/image"
import { ResultData } from "@/lib/types"

export default function Result({ data }: { data: ResultData }) {
  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Disease Detection Result</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{data.title}</h3>
        <p className="mt-2">{data.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Prevention Steps</h3>
        <p className="list-disc list-inside">{data.prevention}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Supplement</h3>
        <div className="border p-2 rounded-lg flex flex-col items-center">
          <Image src={data.supplement_image} alt="Supplement Image" width={150} height={150} />
          <p className="mt-2 text-center">{data.supplement_name}</p>
          <a href={data.buy_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2">Buy Supplement</a>
        </div>
      </div>
    </div>
  )
}