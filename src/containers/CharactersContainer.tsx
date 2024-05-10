import { useCallback } from "react";
import { useCharacterListQuery } from "../lib";
import { CharacterList } from "../components/shared/CharacterList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CharacterSearchInput } from "../components/shared/CharacterSearchInput";
import { CharacterSearchSelect } from "../components/shared/CharacterSearchSelect";
import { formUrlQuery, removeKeysFromQuery } from "../utils";
import { Button } from "../components/ui/button";
import { RotateCcw } from "lucide-react";
import { EnvironmentInfo } from "../components/shared/EnvironmentInfo";

const SEARCH_NAME_QUERY_KEY = "name";
const SEARCH_STATUS_QUERY_KEY = "status";
const SEARCH_GENDER_QUERY_KEY = "gender";

export const CharactersContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchName = searchParams.get(SEARCH_NAME_QUERY_KEY) || null;
  const searchStatus = searchParams.get(SEARCH_STATUS_QUERY_KEY) || null;
  const searchGender = searchParams.get(SEARCH_GENDER_QUERY_KEY) || null;

  const {
    data,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useCharacterListQuery({
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

  const clearFiltersHandler = useCallback(() => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: [
        SEARCH_NAME_QUERY_KEY,
        SEARCH_STATUS_QUERY_KEY,
        SEARCH_GENDER_QUERY_KEY,
      ],
    });

    navigate(newUrl);
  }, [navigate, searchParams]);

  const showResetButton = searchName || searchStatus || searchGender;

  return (
    <div className="bg-black/25">
      <div className="wrapper min-h-screen">
        <header className="flex flex-col gap-1 my-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">
            Rick and Morty Universe
          </h1>
          <EnvironmentInfo version={__APP_VERSION__} />
        </header>

        <div className="grid gap-8">
          <div className="grid gap-1">
            <div className="grid md:grid-cols-4 items-center gap-2 lg:gap-6">
              <CharacterSearchInput
                name={SEARCH_NAME_QUERY_KEY}
                className="sm:col-span-2"
              />

              <CharacterSearchSelect
                placeholder="Status"
                items={statuses}
                value={searchStatus || ""}
                onChange={(value) => selectChangeHandler(value, "status")}
              />

              <CharacterSearchSelect
                placeholder="Gender"
                items={genders}
                value={searchGender || ""}
                onChange={(value) => selectChangeHandler(value, "gender")}
              />
            </div>

            {showResetButton && (
              <Button
                variant="link"
                size="sm"
                onClick={clearFiltersHandler}
                className="flex items-center gap-2 w-fit ml-auto"
              >
                Reset all filters
                <RotateCcw size={18} />
              </Button>
            )}
          </div>

          <CharacterList
            characters={data}
            isLoading={isFetching}
            isError={isError}
            onIntersecting={onIntersectingHandler}
          />
        </div>
      </div>
    </div>
  );
};

const statuses = [
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
];

const genders = [
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
];
