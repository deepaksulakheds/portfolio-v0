#!/bin/sh
set -euo pipefail

# This file is used to build the docker image
# TODO: Add docker push section and delete from local machine if needed

# ====================== DO NOT EDIT ======================
imageBase="portfolio-v1-react"
environment="DEV"
version=1.0.0
# ====================== DO NOT EDIT ======================

printf "\n+-----------------------+\n Current Image Version:\n %s \n+-----------------------+\n" "$version"

# Split version into parts
major=$(echo "$version" | cut -d. -f1)
minor=$(echo "$version" | cut -d. -f2)
patch=$(echo "$version" | cut -d. -f3)

# Increment patch
patch=$((patch + 1))
newVersion="$major.$minor.$patch"
newImage="$imageBase:$environment-$newVersion"

printf "+-----------------------+\n New Image Version:\n %s \n %s \n+-----------------------+\n" "$newVersion" "$newImage"

update_version() {
	sedCmd="s/^version=.*/version=$newVersion/"
	case "$(uname | tr '[:upper:]' '[:lower:]')" in
	darwin) sed -i '' "$sedCmd" "$0" ;;
	*) sed -i "$sedCmd" "$0" ;;
	esac
	printf "\nBase Version updated to '%s'\n" "$newVersion"
}

build_image() {
    printf "\nBuilding Docker image: '%s'\n" "$newImage"

    docker build -t "$newImage" .
    image_id=$(docker images "$newImage" -q)
	
	# docker run -p 3000:3000 "$newImage"

    printf "\nNew Image ID: '%s'\n" "$image_id"
    update_version # Update version
}

build_image
