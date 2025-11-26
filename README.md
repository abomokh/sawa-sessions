# SAWA - موقع جلسات التمكين للطلاب

موقع إلكتروني ثابت نظيف وحديث لطلاب السنة الأولى العرب في جامعة تل أبيب الذين يحضرون جلسات التمكين.

## 🌐 Live Demo

Once deployed, your site will be available at: `https://[your-username].github.io/[repository-name]/`

## 📋 Features

- **تصميم متجاوب** - يعمل بسلاسة على الحاسوب المكتبي والأجهزة اللوحية والهواتف المحمولة
- **واجهة نظيفة وحديثة** - نظام ألوان أحمر/أسود/أبيض مع تصميم احترافي
- **تنقل سهل** - شريط تنقل ثابت مع تمرير سلس
- **⭐ عرض شبكي للمساقات** - بطاقات مساقات في تخطيط شبكي أنيق
- **⭐ نافذة منبثقة للتفاصيل** - انقر على أي مساق لرؤية جميع الجلسات مع التواريخ
- **⭐ قائمة جلسات قابلة للطي (Accordion)** - عرض مضغوط للجلسات مع إمكانية التوسيع لرؤية التفاصيل الكاملة
- **⭐ بيانات JSON** - سهولة تحديث المحتوى من ملف واحد
- **⭐ أيقونات Font Awesome** - أيقونات احترافية بدلاً من الإيموجي
- **⭐ عرض اسم المُعلم/المُمكِّن** - يظهر في البطاقة والنافذة المنبثقة
- **⭐ دعم جلسات Zoom** - روابط انضمام مباشرة مع معلومات الاجتماع المضمنة
- **⭐ جلسات "سيُحدد لاحقاً"** - تنسيق خاص للجلسات غير المحددة
- **⭐ عرض التواريخ** - تواريخ فعلية لكل جلسة
- **⭐ نافذة تحذيرية لواتساب** - تنبيه بالعربية والعبرية قبل الانضمام للمجموعة
- **⭐ أيقونات التواصل الاجتماعي** - روابط إنستغرام وواتساب في الفوتر
- **⭐ توضيح الجمهور المستهدف** - إشارات واضحة أن المحتوى لكلية العلوم الدقيقة فقط
- **جلسات الماراثون** - إبراز خاص لجلسات التحضير للامتحانات
- **معلومات الاتصال** - قائمة شاملة بخدمات الجامعة المفيدة وجهات الاتصال
- **HTML/CSS/JS نقي** - بدون أطر عمل معقدة، سهل التعديل
- **دعم كامل للعربية** - نص عربي بالكامل مع خط Tajawal ودعم RTL
- **شعار الجامعة** - يتضمن شعار جامعة تل أبيب مع النص العبري الرسمي

## 📁 File Structure

```
.
├── index.html                      # Main HTML file
├── style.css                       # All styling
├── script.js                       # JavaScript for dynamic rendering and interactions
├── data.json                       # Course and contact data (easy to update!)
├── Decanat_Success_Logo_Pos_3.png  # University logo
└── README.md                       # This file
```

## 🚀 Deployment to GitHub Pages

### Method 1: Using GitHub Web Interface (Easiest)

1. **Create a new repository on GitHub:**
   - Go to [GitHub](https://github.com) and sign in
   - Click the **+** icon in the top right and select **New repository**
   - Name your repository (e.g., `sawa-sessions`)
   - Choose **Public** visibility
   - Click **Create repository**

2. **Upload your files:**
   - On the repository page, click **uploading an existing file**
   - Drag and drop all three files: `index.html`, `style.css`, `script.js`
   - Click **Commit changes**

3. **Enable GitHub Pages:**
   - Go to your repository's **Settings**
   - Scroll down to the **Pages** section (in the left sidebar)
   - Under **Source**, select **main** branch
   - Click **Save**
   - Wait a few minutes, then visit `https://[your-username].github.io/[repository-name]/`

### Method 2: Using Git Command Line

1. **Initialize and push to GitHub:**

```bash
# Navigate to your project folder
cd path/to/your/project

# Initialize git repository
git init

# Add all files
git add index.html style.css script.js README.md

# Commit the files
git commit -m "Initial commit: SAWA website"

# Add your GitHub repository as remote
git remote add origin https://github.com/[your-username]/[repository-name].git

# Push to GitHub
git branch -M main
git push -u origin main
```

2. **Enable GitHub Pages** (same as Method 1, step 3)

## 🛠️ دليل التخصيص / Customization Guide

### ⭐ تحديث البيانات / Updating Data (EASY!)

**جميع البيانات الآن في ملف واحد:** `data.json`

لتحديث المساقات أو جهات الاتصال، عدّل فقط ملف `data.json` - لا حاجة لتعديل HTML أو JavaScript!

### ⚙️ الإعدادات / Settings

يمكنك التحكم في عرض الأقسام من خلال كائن `settings` في `data.json`:

```json
{
  "settings": {
    "showContactsSection": false
  }
}
```

**الخيارات المتاحة:**
- `showContactsSection`: `true` لإظهار قسم معلومات الاتصال، `false` لإخفائه (افتراضي: `false`)

### تحديث معلومات المساقات / Updating Course Information

Edit `data.json` in the `courses` array:

```json
{
  "id": "course-id",
  "name": "שם הקורס",
  "code": "Course Code",
  "instructor": "שם המתגבר",
  "mainSession": {
    "day": "اليوم",
    "time": "16:00 - 18:00",
    "location": "בניין, חדר"
  },
  "zoomLink": "https://zoom.us/j/...",
  "zoomMeetingId": "123 4567 8901",
  "zoomPasscode": "123456",
  "sessions": [
    {
      "date": "17.11",
      "day": "اليوم",
      "time": "16:00 - 18:00",
      "location": "בניין, חדר",
      "description": "وصف الجلسة",
      "isMarathon": false,
      "isZoom": false
    }
  ]
}
```

**ملاحظات:**
- `instructor`: اسم المُعلم/المُمكِّن (اختياري)
- `mainSession`: الجلسة الرئيسية التي تظهر في البطاقة الرئيسية
- `sessions`: جميع الجلسات (تظهر في النافذة المنبثقة)
- `date`: التاريخ الفعلي للجلسة (اختياري)
- `isMarathon: true`: لجعل الجلسة جلسة ماراثون
- `isTBD: true`: للجلسات التي سيتم تحديدها لاحقاً
- `isZoom: true`: لجلسات Zoom (سيظهر زر الانضمام)
- `zoomLink`, `zoomMeetingId`, `zoomPasscode`: معلومات Zoom (مطلوبة لجلسات Zoom)

### إضافة مساق جديد / Adding a New Course

أضف عنصر جديد في مصفوفة `courses` في `data.json`:

```json
{
  "courses": [
    {
      "id": "new-course",
      "name": "מתמטיקה דיסקרטית",
      "code": "0368.1234",
      "instructor": "שם המתגבר",
      "mainSession": { ... },
      "sessions": [ ... ]
    }
  ]
}
```

### إضافة جلسة Zoom / Adding a Zoom Session

لجلسات Zoom، أضف معلومات الرابط على مستوى المساق:

```json
{
  "id": "zoom-course",
  "name": "אלגברה לינארית",
  "zoomLink": "https://us06web.zoom.us/j/12345678901?pwd=...",
  "zoomMeetingId": "123 4567 8901",
  "zoomPasscode": "123456",
  "sessions": [
    {
      "day": "الأحد",
      "time": "18:00 - 20:00",
      "location": "زووم (Zoom)",
      "isZoom": true
    }
  ]
}
```

### إضافة جلسة "سيُحدد لاحقاً" / Adding TBD Session

لجلسة الماراثون غير المحددة:

```json
{
  "date": "TBD",
  "day": "سيُحدد لاحقاً",
  "time": "سيُحدد لاحقاً",
  "location": "سيُحدد لاحقاً",
  "description": "ماراثون استعداداً للامتحان",
  "isMarathon": true,
  "isTBD": true
}
```

### تحديث معلومات الاتصال / Updating Contact Information

Edit `data.json` in the `contacts` array:

```json
{
  "id": "contact-id",
  "icon": "fa-graduation-cap",
  "title": "اسم الخدمة",
  "description": "وصف الخدمة",
  "email": "email@tau.ac.il",
  "phone": "03-640-1234"
}
```

**أيقونات Font Awesome المتاحة:**
- `fa-graduation-cap` - تخرج
- `fa-book-open` - كتاب
- `fa-hands-helping` - مساعدة
- `fa-chalkboard-teacher` - معلم
- `fa-laptop` - حاسوب
- `fa-book` - مكتبة
- `fa-globe` - عالمي
- `fa-universal-access` - إمكانية الوصول

[جميع الأيقونات المتاحة](https://fontawesome.com/icons)

### تغيير الألوان / Changing Colors

**نظام الألوان الحالي:** أحمر (#C00000)، أسود، وأبيض

Edit `style.css` and modify the CSS variables in the `:root` section:

```css
:root {
    --primary-color: #C00000;      /* اللون الأساسي - أحمر */
    --primary-dark: #A00000;       /* أحمر داكن */
    --secondary-color: #000000;    /* أسود */
    /* ... other colors ... */
}
```

### تحديث الخط / Updating Font

الموقع يستخدم حالياً خط **Tajawal** للعربية. لتغييره، عدّل في `style.css`:

```css
:root {
    --font-main: 'YourFont', 'Tajawal', sans-serif;
}
```

وأضف رابط الخط في `index.html`.

### تحديث روابط التواصل الاجتماعي / Updating Social Media Links

**لتحديث رابط مجموعة الواتساب:**

في `index.html`، ابحث عن:
```html
<a href="https://chat.whatsapp.com/EX6aM2HDrwk6abhmAtLLov" target="_blank" class="btn btn-whatsapp-large">
```

**لتحديث رابط إنستغرام:**

في `index.html`، ابحث عن:
```html
<a href="https://www.instagram.com/tau.sawa/" target="_blank">
```

**لتحديث نص التحذير في نافذة الواتساب:**

في `index.html`، ابحث عن `whatsappModal` وعدّل النصوص العربية والعبرية.

**لتحديث معلومات التواصل في الفوتر:**

عدّل القسم في `index.html`:
```html
<div class="footer-section">
    <h4>تواصل معنا</h4>
    <p><strong>رامي طيبي</strong> - عامل اجتماعي</p>
    <p>📧 ramiti@tauex.tau.ac.il</p>
    ...
</div>
```

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA standards
- Responsive text sizing

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 ملاحظات التصميم / Design Notes

- **نظام الألوان / Color Palette**: 
  - الموقع الرئيسي: أحمر (#C00000)، أسود، وأبيض
  - نافذة الواتساب: فيروزي متدرج (#6ECFBD إلى #2B8CA3) مستوحى من أيقونة المجموعة
- **الخطوط / Typography**: خط Tajawal للعربية مع دعم خطوط النظام للعبرية
- **التباعد / Spacing**: نظام تباعد متسق باستخدام متغيرات CSS
- **الظلال / Shadows**: ظلال خفيفة للعمق دون الإرهاق
- **دعم RTL**: دعم كامل للكتابة من اليمين إلى اليسار للنص العربي والعبري
- **نصوص مختلطة**: معالجة صحيحة للنصوص العربية والعبرية المختلطة (المساقات والمواقع بالعبرية)
- **Gradient Effects**: تأثيرات متدرجة للنصوص والأزرار في نافذة الواتساب

## 💡 Suggestions for Enhancement

### Future Improvements:

1. **Add a Registration Form** - Allow students to sign up for sessions directly
2. **Calendar Integration** - Add .ics file downloads for adding sessions to calendar
3. **Multi-language Support** - Add Hebrew/Arabic translations with language toggle
4. **Search Functionality** - Filter courses and sessions by keyword
5. **Announcements Section** - Add a news/updates section for important information
6. **Image Gallery** - Add photos from previous sessions
7. **Testimonials** - Include student feedback and success stories
8. **FAQ Section** - Address common questions about the program
9. **Interactive Map** - Show building locations on campus map
10. **Dark Mode** - Add a dark theme toggle for reduced eye strain

### Performance Optimizations:

- Add a favicon (create `favicon.ico` and reference it in HTML)
- Compress CSS/JS for production (minification)
- Add meta tags for better SEO
- Implement lazy loading for images (if you add images)
- Add Open Graph tags for social media sharing

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. If you make improvements that could benefit others, consider sharing them!

## 📧 Contact

For questions about the website or the SAWA program:
- Email: sawa@tauex.tau.ac.il
- Phone: 03-640-5252

---

**Built with ❤️ for Tel Aviv University students**

