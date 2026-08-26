import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

type DialogProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Dialog({ eyebrow, title, children, onClose }: DialogProps) {
  const { t } = useTranslation();

  return (
    <div className="dialog-backdrop">
      <section
        className="form-panel dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="dialog-title">{title}</h2>
          </div>
          <Button
            className="icon-button"
            variant="icon"
            type="button"
            aria-label={t("common.close")}
            onClick={onClose}
          >
            x
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
}
