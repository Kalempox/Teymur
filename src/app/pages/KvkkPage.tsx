const GOLD = "#dbbe8c";
const DARK = "#050f28";

export function KvkkPage() {
  return (
    <div style={{ backgroundColor: "#faf9f6", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: DARK, padding: "120px 6vw 60px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: "16px" }}>
            Yasal Bildirim
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, color: "#ffffff", margin: 0, lineHeight: 1.15, letterSpacing: "0.02em" }}>
            KVKK Aydınlatma Metni
          </h1>
        </div>
      </div>

      {/* İçerik */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "80px 6vw 120px" }}>

        <Section title="Kişisel Verilerin İşlenmesi ve Korunması Politikası">
          <p>
            Türkiye Cumhuriyeti Anayasası'nın 20. maddesinin 3. fıkrasına göre, "Herkes, kendisiyle ilgili kişisel verilerin korunmasını isteme hakkına sahiptir. Bu hak; kişinin kendisiyle ilgili kişisel veriler hakkında bilgilendirilme, bu verilere erişme, bunların düzeltilmesini veya silinmesini talep etme ve amaçları doğrultusunda kullanılıp kullanılmadığını öğrenmeyi de kapsar. Kişisel veriler, ancak kanunda öngörülen hallerde veya kişinin açık rızasıyla işlenebilir…"
          </p>
          <p>
            Kişisel Verilerin Korunması hakkı temel insan hakkı olarak Avrupa Birliği Temel Haklar Bildirgesi'nin 8. ve Avrupa Birliği'nin İşleyişi Hakkında Antlaşma'nın 16. maddelerinde de yerini almıştır.
          </p>
          <p>
            Kişisel Verilerin Korunması Kanunu (KVKK) madde 4, kişisel verilerin işlenmesi için uyulması gereken temel ilkeleri listelemektedir. Söz konusu ilkeler, <strong>TEYMUR TEKSTİL SANAYİ VE TİCARET A.Ş.</strong> tarafından gerçekleştirilen tüm kişisel veri işleme faaliyetleri kapsamında dikkate alınmakta ve titizlikle uygulanmaktadır.
          </p>
          <p>Şirket'in veri işleme süreçlerinde takip ettiği temel ilkeler:</p>
          <List items={[
            "Hukuka ve Dürüstlük Kuralına Uygun İşleme",
            "Kişisel Verileri Doğru ve Güncel İşleme",
            "Belirli, Açık ve Meşru Amaçlarla İşleme",
            "İşlendikleri Amaçla Bağlantılı, Sınırlı ve Ölçülü İşleme",
            "İlgili Mevzuatta Öngörülen Süre Kadar Muhafaza Etme",
          ]} />
        </Section>

        <Section title="Giriş">
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu, kişisel verilerin işlenmesinde kişilerin temel hak ve özgürlüklerini korumak ve veri işleyenlerin yükümlülüklerini belirlemek amacıyla 7 Nisan 2016 tarihli Resmi Gazete'de yayımlanmıştır.
          </p>
        </Section>

        <Section title="Amaç">
          <p>
            TEYMUR TEKSTİL SANAYİ VE TİCARET A.Ş. tarafından işlenecek kişisel verilerin, mevzuata uygun olarak işlenmesi ve korunması, Anayasa'da güvence altına alınan özel hayatın gizliliği başta olmak üzere temel hak ve özgürlüklerin korunması amacıyla bu politika hazırlanmıştır.
          </p>
        </Section>

        <Section title="Kapsam">
          <p>
            Politika kapsamına, Şirket faaliyetleri nedeniyle doğrudan veya dolaylı şekilde verileri işlenen tüm gerçek kişiler girmektedir.
          </p>
        </Section>

        <Section title="Tanımlar">
          <DefinitionList items={[
            { term: "Şirket", def: "TEYMUR TEKSTİL SANAYİ VE TİCARET A.Ş." },
            { term: "Açık Rıza", def: "Belirli bir konuya ilişkin, bilgilendirilmeye dayanan ve özgür iradeyle açıklanan rıza." },
            { term: "Çerez (Cookie)", def: "Kullanıcı tercihlerinin saklandığı küçük metin dosyaları." },
            { term: "İlgili Kullanıcı", def: "Verilerin işlenmesinden sorumlu kişiler." },
            { term: "İrtibat Kişisi", def: "KVKK kapsamında Kurum ile iletişimi sağlayan kişi." },
            { term: "Kişisel Veri", def: "Kimliği belirli veya belirlenebilir kişiye ilişkin bilgiler." },
            { term: "Veri Sorumlusu", def: "Kişisel verilerin işlenme amaç ve vasıtalarını belirleyen kişi veya tüzel kişilik." },
            { term: "Özel Nitelikli Kişisel Veri", def: "Sağlık, dini inanç, biyometrik veriler vb. hassas veriler." },
          ]} />
        </Section>

        <Section title="Sorumluluk">
          <p>
            Şirket'in tüm birimleri ve çalışanları, KVKK çerçevesinde alınan teknik ve idari tedbirleri uygulamak ve veri güvenliğini sağlamakla yükümlüdür.
          </p>
        </Section>

        <Section title="Politika Akışı">
          <p><strong>Veri Sorumlusu:</strong> TEYMUR TEKSTİL SANAYİ VE TİCARET A.Ş.</p>
          <p>KVKK uyum süreci için KVKK Komisyonu kurulmuştur. Bir İrtibat Kişisi görevlendirilmiştir.</p>
        </Section>

        <Section title="Kişisel Verilerin İşlenme Amaçları">
          <List items={[
            "Kanuni yükümlülüklerin yerine getirilmesi",
            "Şirket hizmetlerinden yararlanılabilmesi",
            "İletişim faaliyetleri",
            "İnsan kaynakları süreçleri",
            "Mali işlemler",
            "Ziyaretçi kayıtlarının oluşturulması",
            "Bina ve çalışan güvenliği",
            "Tanıtım ve reklam faaliyetleri",
            "Arşivleme ve raporlama",
            "Yasal mercilere bilgi sunulması",
          ]} />
        </Section>

        <Section title="İşlenen Kişisel Veriler">
          <List items={[
            "Kimlik Bilgisi (ad, soyad, T.C. kimlik no vb.)",
            "İletişim Bilgisi (telefon, adres, e-mail)",
            "Lokasyon Verisi (GPS, seyahat bilgileri)",
            "Özlük Bilgisi (çalışan kayıtları)",
            "Müşteri İşlem Bilgisi (fatura, sipariş, çağrı merkezi kayıtları)",
            "Görsel/İşitsel Bilgi (fotoğraf, kamera kayıtları, ses kayıtları)",
            "Sağlık Bilgisi (engellilik durumu, sağlık raporları)",
            "Finansal Bilgi (banka bilgileri, IBAN, kredi kartı)",
          ]} />
        </Section>

        <Section title="Kişisel Verilerin Toplanma Yöntemleri">
          <List items={[
            "Formlar (üyelik, başvuru formları)",
            "Evraklar, faks, e-mail, KEP adresi",
            "Kamera kayıtları",
            "Web sitesi ve mobil uygulamalarda kullanılan çerezler",
            "Telefon görüşmeleri",
          ]} />
        </Section>

        <Section title="Hukuki Sebepler">
          <List items={[
            "Açık rıza",
            "Kanunlarda öngörülmesi",
            "Sözleşmenin kurulması veya ifası",
            "Hukuki yükümlülük",
            "Meşru menfaat",
            "Bir hakkın tesisi, kullanılması veya korunması",
          ]} />
        </Section>

        <Section title="Verilerin Aktarımı">
          <p><strong>Yurtiçi aktarım:</strong> Kamu kurumları, yargı mercileri, iş ortakları, tedarikçiler.</p>
          <p><strong>Yurtdışı aktarım:</strong> E-mail sağlayıcıları, yurtdışı etkinlik/organizasyon durumları.</p>
          <p>Aktarım yalnızca KVKK hükümleri doğrultusunda yapılır.</p>
        </Section>

        <Section title="İlgili Kişinin Hakları (KVKK m.11)">
          <List items={[
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
            "İşlenmişse bilgi talep etme",
            "Amaç doğrultusunda kullanılıp kullanılmadığını öğrenme",
            "Yanlış işlenmişse düzeltilmesini talep etme",
            "Silinmesini veya yok edilmesini isteme",
            "Aktarıldığı üçüncü kişileri öğrenme",
            "Zarara uğranmışsa tazminat talep etme",
          ]} />
        </Section>

        <Section title="Sonuç">
          <p>
            TEYMUR TEKSTİL SANAYİ VE TİCARET A.Ş., kişisel verilerin işlenmesi ve korunması konusunda KVKK'ya tam uyum sağlamayı, gerekli teknik ve idari tedbirleri almayı, şeffaflık ilkesi gereği ilgili kişileri bilgilendirmeyi taahhüt eder.
          </p>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <div style={{ width: "28px", height: "1px", backgroundColor: GOLD, flexShrink: 0 }} />
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 400, color: DARK, margin: 0, lineHeight: 1.2 }}>
          {title}
        </h2>
      </div>
      <div style={{ paddingLeft: "44px", fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.9, color: "rgba(5,15,40,0.7)" }}>
        {children}
      </div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0 0 0 -4px", padding: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px" }}>
          <span style={{ color: GOLD, fontSize: "10px", flexShrink: 0 }}>◆</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DefinitionList({ items }: { items: { term: string; def: string }[] }) {
  return (
    <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
      {items.map(({ term, def }, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "16px" }} className="kvkk-def-row">
          <dt style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: DARK }}>{term}</dt>
          <dd style={{ margin: 0, fontSize: "14px", color: "rgba(5,15,40,0.7)" }}>{def}</dd>
        </div>
      ))}
      <style>{`@media (max-width: 600px) { .kvkk-def-row { grid-template-columns: 1fr !important; gap: 4px !important; } }`}</style>
    </dl>
  );
}
