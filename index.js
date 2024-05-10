(async () => await fetch("contents.json").then(res => res.json()).then(res => {

    const nav = document.getElementById("nav");
    const home = document.getElementById("home");
    const schoolLogo = document.getElementById("schoolLogo");
    const schoolName = document.getElementById("schoolName");
    const visiMisiImage = document.getElementById("visiMisiImage");
    
    const teacherContainer = document.getElementById("teacherContainer");
    const galleryContainer = document.getElementById("galleryContainer");
    const prevTeacherBtn = document.getElementById("prevTeacherBtn");
    const nextTeacherBtn = document.getElementById("nextTeacherBtn");
    const seeMoreBtn = document.getElementById("seeMoreBtn");

    if (res.logo) {
        schoolName.remove();
        schoolLogo.src = res.logo;
    } else {
        schoolLogo.remove();
    }

    home.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${res.backgroundHome}') no-repeat center`
    home.style.backgroundSize = "cover"

    visiMisiImage.src = res.visiMisi;

    let teacherEl = "";
    let galleryEl = "";

    res.teachers.forEach(teacher => {
        teacherEl += `
        <div class="pop-up group teacher-wrapper">
            <div class="group-hover:opacity-100 teacher-info">
                <h1 class="group-hover:translate-y-0 group-hover:opacity-100">${teacher.name}</h1>
                <p class="group-hover:translate-y-0 group-hover:opacity-100">${teacher.role}</p>
            </div>
            <img src="${teacher.image}" alt="${teacher.name}" class="teacher-image">
        </div>
        `        
    });

    res.gallery.slice(0,6).forEach(pict => {
        galleryEl += `
        <div>
            <img src="${pict}" alt="${pict.split("/")[1]}" class="rounded-md w-full aspect-video object-center object-cover pop-up">
        </div>
        `
    })

    teacherContainer.innerHTML = teacherEl;
    galleryContainer.innerHTML = galleryEl;

    window.addEventListener("load", async () => {
        gsap.to("#loader", {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                document.getElementById("loader").remove();
                
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(v => {
                        if (v.isIntersecting) {
                            if (v.target.id == "home") {
                                nav.classList.add("nav-transparent")
                                nav.classList.remove("nav-white")
                            } else {
                                nav.classList.add("nav-white")
                                nav.classList.remove("nav-transparent")
                                document.getElementById(`${v.target.id}Nav`).classList.add("bg-primary", "text-white");
                            }

                            gsap.to(`#${v.target.id} .pop-up`, {
                                y: 0,
                                opacity: 1,
                                stagger: .25
                            })
        
                        } else {
                            document.getElementById(`${v.target.id}Nav`)?.classList.remove("bg-primary", "text-white");
                        }
                    });
                }, {
                    threshold: 0.4
                });
        
                document.querySelectorAll(".section").forEach(v => {
                    observer.observe(v);
                });
        
                gsap.to("#nav .pop-up", {
                    y: 0,
                    opacity: 1,
                    stagger: .1
                })
        
                prevTeacherBtn.addEventListener("click", () => {
                    teacherContainer.scrollTo({
                        left: teacherContainer.scrollLeft - 500
                    })
                });
                
                nextTeacherBtn.addEventListener("click", () => {
                    teacherContainer.scrollTo({
                        left: teacherContainer.scrollLeft + 500
                    })
                });

                seeMoreBtn.addEventListener("click", () => {
                    galleryEl = "";
                    res.gallery.slice(6).forEach(pict => {
                        galleryEl += `
                        <div>
                            <img src="${pict}" alt="${pict.split("/")[1]}" class="rounded-md w-full aspect-video object-center object-cover">
                        </div>
                        `
                    });

                    galleryContainer.innerHTML += galleryEl;
                    seeMoreBtn.remove();
                });
                
                document.getElementById("copyright").innerHTML = `&copy; ${new Date().getFullYear()} All Rights Reserved By MI Muhammadiyah 2 Sumbersari`
            }
        });
    });
}))();