export const getAnimeContents = () => {
    const animeContents = async () => {
		try {
			const { data:response } = await useFetch("/api/hobby/anime/GetAnimeContents")

			if (response === null) {
				console.log("Not contens ...");
			}

			return response.value

		} catch (err) {
			await navigateTo('/error')
		}

	}

	return {
		animeContents
	}
};
