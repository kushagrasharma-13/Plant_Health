import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Result from '@/components/result';
import { ResultData } from '@/lib/types';

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<ResultData | null>(null);

  useEffect(() => {
    if (router.query.data) {
      const parsedData: ResultData = JSON.parse(router.query.data as string);
      setData(parsedData);
    }
  }, [router.query.data]);

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Disease Detection Result</h2>
      {data ? <Result data={data} /> : <p>Loading...</p>}
    </div>
  );
}
