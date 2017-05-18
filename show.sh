echo $1
if [ $# -eq 0 ]
then
    reveal-md ./slides.md --title 'WebStorage' --theme solarized --highlightTheme github-gist
else
    reveal-md ./slides.md --title 'show.sh' --theme moon
fi
