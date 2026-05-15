export default function(eleventyConfig) {
    eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/about/**/*.{css,js,png}");
    eleventyConfig.addPassthroughCopy("src/portfolio/**/*.{css,js,png}");
    eleventyConfig.addPairedShortcode("gallery", galleryShortcode);
	eleventyConfig.addShortcode("galleryImg", galleryImageShortcode);
    eleventyConfig.addPassthroughCopy({
		"./node_modules/photoswipe/dist/photoswipe-lightbox.esm.min.js":
			"/js/photoswipe/photoswipe-lightbox.esm.min.js",
		"./node_modules/photoswipe/dist/photoswipe.esm.min.js":
			"/js/photoswipe/photoswipe.esm.min.js",
		"./node_modules/photoswipe/dist/photoswipe.css":
		  "/css/photoswipe/photoswipe.css",
	});

	        return {
            dir: {
                input: "src",
            }
        }



import Image, { Util } from "@11ty/eleventy-img";
import sharp from "sharp";


async function galleryImageShortcode(
	src,
	alt,
	previewWidth = 1000
){

	console.log(src, alt); let lightboxImageWidth = 2000;
	src = Util.normalizeImageSource(
		{
			input: this.eleventy.directories.input,
			inputPath: this.page.inputPath,
		},
		src,
	);

	const metadata = await sharp(src).metadata();

	if (metadata.height > metadata.width) {
		lightboxImageWidth = 720;
	}

	const options = {
		formats: ["webp"],
		widths: [previewWidth, lightboxImageWidth],
		urlPath: "/assets/images/art/",
		outputDir: this.eleventy.directories.output + "/assets/images/art/",
	};

	const genMetadata = await Image(src, options);
	console.log(genMetadata);
	if (genMetadata.webp.length == 1) {
		genMetadata.webp.splice(0, 0, genMetadata.webp[0]);
	}

	const output = `
        <a href="${genMetadata.webp[0].url}" data-pswp-width="${genMetadata.webp[0].width}" data-pswp-height="${genMetadata.webp[0].height}" target="_blank" style="text-decoration: none">
          <img src="${genMetadata.webp[0].url}" alt="${alt}" eleventy:ignore/>
        </a>
    `.replace(/(\r\n|\n|\r)/gm, "");
	return output;
}

function galleryShortcode(content, name, imgPerCol) {
	if (imgPerCol === undefined) {
		const nImg = (content.match(/<a /g) || []).length;
		imgPerCol = 1;
		if (nImg % 2 == 0) {
			imgPerCol = 2;
		} else if (nImg > 1) {
			imgPerCol = 3;
		}
	}
	return `
				<link rel="stylesheet" href="/css/photoswipe/photoswipe.css">
        <div>
            <div class="eleventy-plugin-gallery" id="gallery-${name}" style="grid-template-columns: repeat(${imgPerCol}, 1fr);">
                ${content}
            </div>
            <script type="module" elventy:ignore eleventy:ignore>
                import PhotoSwipeLightbox from '/js/photoswipe/photoswipe-lightbox.esm.min.js';
                import PhotoSwipe from '/js/photoswipe/photoswipe.esm.min.js';
                const lightbox = new PhotoSwipeLightbox({
                    gallery: '#gallery-${name}',
                    children: 'a',
                    pswpModule: PhotoSwipe,
                    preload: [1, 1]
                });
                lightbox.init();
            </script>
        </div>
    `.replace(/(\r\n|\n|\r)/gm, "");


}}





