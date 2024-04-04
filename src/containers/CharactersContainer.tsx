import { useCallback, useMemo } from "react";
import { useCharacterListQuery } from "../lib";
import { CharacterList } from "../components/shared/CharacterList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CharacterSearchInput } from "../components/shared/CharacterSearchInput";
import { CharacterSearchSelect } from "../components/shared/CharacterSearchSelect";
import { formUrlQuery } from "../utils";

const SEARCH_NAME_QUERY_KEY = "name";
const SEARCH_STATUS_QUERY_KEY = "status";
const SEARCH_GENDER_QUERY_KEY = "gender";

export const CharactersContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchName = searchParams.get(SEARCH_NAME_QUERY_KEY) || "";
  const searchStatus = searchParams.get(SEARCH_STATUS_QUERY_KEY) || "";
  const searchGender = searchParams.get(SEARCH_GENDER_QUERY_KEY) || "";

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useCharacterListQuery({
      ...(searchName && { name: searchName }),
      ...(searchStatus && { status: searchStatus }),
      ...(searchGender && { gender: searchGender }),
    });

  const onIntersectingHandler = useCallback(() => {
    if (isFetchingNextPage) return;

    if (hasNextPage) fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const selectChangeHandler = useCallback(
    (value: string, type: "status" | "gender") => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:
          type === "status" ? SEARCH_STATUS_QUERY_KEY : SEARCH_GENDER_QUERY_KEY,
        value,
      });

      navigate(newUrl);
    },
    [navigate, searchParams]
  );

  const statuses = useMemo(
    () => [
      {
        label: "Alive",
        value: "alive",
      },
      {
        label: "Dead",
        value: "dead",
      },
      {
        label: "Unknown",
        value: "unknown",
      },
    ],
    []
  );

  const genders = useMemo(
    () => [
      {
        label: "Female",
        value: "female",
      },
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Genderless",
        value: "genderless",
      },
      {
        label: "Unknown",
        value: "unknown",
      },
    ],
    []
  );

  return (
    <div className="bg-black/25">
      <div className="wrapper min-h-screen">
        <h1 className="text-3xl lg:text-5xl font-bold text-white my-8">
          Rick and Morty Universe
        </h1>

        <div className="grid gap-8">
          <div className="grid md:grid-cols-4 items-center gap-2 lg:gap-6">
            <CharacterSearchInput className="sm:col-span-2" />

            <CharacterSearchSelect
              placeholder="Status"
              items={statuses}
              defaultValue={searchStatus}
              onChange={(value) => selectChangeHandler(value, "status")}
            />

            <CharacterSearchSelect
              placeholder="Gender"
              items={genders}
              defaultValue={searchGender}
              onChange={(value) => selectChangeHandler(value, "gender")}
            />
          </div>

          <CharacterList
            characters={data}
            isLoading={isLoading}
            onIntersecting={onIntersectingHandler}
          />
        </div>
      </div>
    </div>
  );
};
