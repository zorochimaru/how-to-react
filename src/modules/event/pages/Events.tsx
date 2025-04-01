import { useQuery } from "@tanstack/react-query";
import { apiClient, Event } from "../../../core";

const fetchEvents = async () => {
  const response = await apiClient.get("/todos");
  return response.data;
};

export const Events = () => {
  const { data, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (error) {
    return <div>error</div>;
  }

  return (
    <div>
      <h1 className="text-3xl">Events</h1>
      <ul className="list-disc">
        {data?.map((event: Event) => (
          <li key={event.id} className="my-2">
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
