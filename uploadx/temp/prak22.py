from kanren.facts import Relation, facts
from kanren.core import var, run
from kanren.goals import membero

ukuran = Relation()
warna = Relation()
gelap = Relation()

facts(ukuran, ("beruang", "besar"), 
      ("gajah", "besar"), 
      ("kucing", "kecil"),
      ("ayam", "kecil"),
      ("tikus", "kecil"),
      ("anjing", "sedang"))


facts(warna, ("beruang", "cokelat"), 
      ("kucing", "hitam"), 
      ("gajah", "kelabu"),
       ("ayam", "merah"),
       ("tikus", "hitam"))


facts(gelap, ("hitam")) 
facts(gelap, ("coklat"))
facts(gelap, ("merah"))
facts(gelap, ("abu-abu"))

x = var()
kecil = run(0, x, ukuran(x, "kecil")) 
sedang = run(0, x, ukuran(x, "sedang"))
print("hewan berukuran kecil: ", kecil)
print("Hewan berukuran sedang: ", sedang)
